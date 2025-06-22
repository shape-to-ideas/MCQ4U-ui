import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
    ERROR_MESSAGES,
    MESSAGE_SERVICE_SEVERITY,
    PAGE_ROUTES,
} from '../../shared/constants';
import { TopicsStore } from '../../shared/store/topics.store';
import { UserStore } from '../../shared/store/user.store';
import { Topic } from '../../shared/requests/response.interface';
import { RequestsService } from '../../shared/requests/requests.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.sass',
})
export class SidebarComponent implements OnInit {
    isUserLoggedIn = false;
    topics: Topic[] = [];
    isAdmin = false;
    isTopicCreationDialogVisible = false;
    readonly topicFieldName = 'topicName';
    topicFormGroup: FormGroup = new FormGroup({
        [this.topicFieldName]: new FormControl('', Validators.required),
    });
    constructor(
        private topicsStore: TopicsStore,
        private requestsService: RequestsService,
        private router: Router,
        private userStore: UserStore,
        private messageService: MessageService,
    ) {}

    ngOnInit() {
        this.userStore.state$.subscribe(async (user) => {
            if (user.id) {
                this.isUserLoggedIn = true;
                this.isAdmin = user.is_admin;

                const topics = await this.requestsService.fetchTopicList();
                this.topicsStore.updateState(topics);
            } else {
                this.isUserLoggedIn = false;
            }
        });

        this.topicsStore.state$.subscribe((topicState) => {
            this.topics = topicState;
        });
    }

    openAddTopicModal() {
        this.isTopicCreationDialogVisible = true;
    }

    async addTopic() {
        if (this.topicFormGroup.valid) {
            try {
                const topicName =
                    this.topicFormGroup.controls[this.topicFieldName].value;
                const addedTopic = await this.requestsService.createTopics([
                    topicName,
                ]);

                this.isTopicCreationDialogVisible = false;
                this.addTopicToStore(addedTopic.data);
            } catch (error: unknown) {
                this.messageService.add({
                    detail: ERROR_MESSAGES.ADD_TOPIC_ERROR,
                    severity: MESSAGE_SERVICE_SEVERITY.ERROR,
                });
            }
        }
    }

    redirectToTopic(topicId: string, topicName: string) {
        this.router.navigate([PAGE_ROUTES.DASHBOARD], {
            queryParams: { topicId, topicName },
        });
    }

    addTopicToStore(topics: Topic[]) {
        this.topicsStore.updateState(topics);
    }
}
