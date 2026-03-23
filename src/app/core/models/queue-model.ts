export interface QueueIssueRequest {
  prefix?: string;
}

export interface QueueTicketModel {
  queueNo: string;
  issuedAt: string;
}

export interface QueueCurrentModel {
  currentQueueNo: string;
  updatedAt: string;
}

export interface QueueNextModel {
  currentQueueNo: string;
  updatedAt: string;
}

export interface QueueResetModel {
  currentQueueNo: string;
  updatedAt: string;
}