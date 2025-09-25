export const NOTIFICATION_TYPES = {
    SS_CHANGE: "SS_CHANGE"
} as const;

export type NotificationType = typeof NOTIFICATION_TYPES[keyof typeof NOTIFICATION_TYPES];
