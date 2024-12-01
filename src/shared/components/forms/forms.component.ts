import {
    Component,
    DoCheck,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { FORM_TYPES, FormConfigTypes } from '../../constants';

@Component({
    selector: 'app-forms',
    templateUrl: './forms.component.html',
    styleUrl: './forms.component.sass',
})
export class FormsComponent implements OnInit, DoCheck {
    @Input() formConfigs: FormConfigTypes[] = [];
    @Input() baseFormValues = {};
    @Output() submitFormEvent = new EventEmitter();

    oldFormConfigs: FormConfigTypes[] = [];
    oldFormValues = {};
    currentQuestionIndex = 1; //used only for formArrays
    formTypes = FORM_TYPES;
    formGroupValues: Record<string, any> = {};
    formGroup: FormGroup | undefined;

    constructor() {}

    ngOnInit(): void {
        this.createFormGroup();
    }

    ngDoCheck() {
        if (this.formConfigs.length !== this.oldFormConfigs.length) {
            this.updateFormGroup();
        }
    }

    updateFormGroup() {
        this.oldFormValues = { ...this.formGroup?.value };
        this.createFormGroup();
        // this.formGroup?.setValue(this.oldFormValues);
        this.oldFormConfigs = [...this.formConfigs];
    }

    createFormGroup() {
        for (let index = 0; index < this.formConfigs.length; index++) {
            const config = this.formConfigs[index];
            if (config.isFormArray) {
                this.formGroupValues[config.name] = this.getFormArray(config);
            } else {
                const formValidations = this.getFormValidations(config);
                this.formGroupValues[config.name] = new FormControl(
                    config.defaultValue,
                    formValidations,
                );
            }
        }
        this.formGroup = new FormGroup(this.formGroupValues);
    }

    submitForm() {
        this.formGroup?.markAsDirty();
        this.submitFormEvent.emit(this.formGroup);
    }

    getFormValidations(config: FormConfigTypes) {
        return config.validations?.length
            ? config.validations.map((validation) => {
                  switch (validation.name) {
                      case 'required':
                          return Validators.required;
                      case 'minLength':
                          return Validators.minLength(
                              typeof validation.value === 'number'
                                  ? validation.value
                                  : 0,
                          );
                      case 'maxLength':
                          return Validators.maxLength(
                              typeof validation.value === 'number'
                                  ? validation.value
                                  : 0,
                          );
                      case 'email':
                          return Validators.email;
                      default:
                          return Validators.nullValidator;
                  }
              })
            : [];
    }

    getFormArray(
        config: FormConfigTypes,
    ): FormArray<
        | FormControl<string | null | undefined>
        | FormArray<FormControl<string | null | undefined>>
    > | null {
        if (!config.formArray?.length) {
            return null;
        }
        return new FormArray(
            config.formArray.map((formConfig: FormConfigTypes) => {
                if (formConfig.isFormArray && formConfig.formArray?.length) {
                    return new FormArray(
                        formConfig.formArray.map((fc: FormConfigTypes) => {
                            return new FormControl(
                                formConfig.defaultValue,
                                this.getFormValidations(config),
                            );
                        }),
                    );
                }
                return new FormControl(
                    formConfig.defaultValue,
                    this.getFormValidations(config),
                );
            }),
        );
    }
}
