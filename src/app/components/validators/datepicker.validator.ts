import {AbstractControl} from "@angular/forms";

export function datepickerValidator (startDateName: string, endDateName: string, isFirstStartDate : boolean) {
  return (group: AbstractControl) => {
    const startDate = group.get(startDateName);
    const endDate = group.get(endDateName);
    if ((startDate?.value > endDate?.value) && isFirstStartDate) {
      startDate?.setErrors({startDateIsLargerEndDate: true, message: "Начальная дата не может быть больше конечной"})
    } else {
      startDate!.setErrors(null)
    }
    if ((endDate?.value < startDate?.value) && !isFirstStartDate) {
      endDate?.setErrors({endDateLessStartDate: true, message: "Конечная дата не может быть раньше начальной"})
    } else {
      endDate!.setErrors(null)
    }
    return null
  }
}

