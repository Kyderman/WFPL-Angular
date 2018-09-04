export class DateTimeHelpers {

    public setTrainingTotalTime(values: any) {

        let result: number;

        // pump back in the total time to the form properties
        result = values.hours * 60 + values.mins;
        // remove the hours and mins properties
        delete values.hours;
        delete values.mins;

        return result;
    }

}
