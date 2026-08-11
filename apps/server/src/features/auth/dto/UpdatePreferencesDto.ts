export interface UpdatePreferencesDto {
    timezone?: string;
    dateFormat?: string;
    startOfWeek?: 'monday' | 'sunday';
}