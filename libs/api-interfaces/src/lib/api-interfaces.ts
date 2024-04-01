export enum ServiceType {
  Electrical = 'electrical',
  General = 'general',
  PestControl = 'pest-control',
  Plumbing = 'plumbing',
}

export const ALL_SERVICE_TYPES = [
  ServiceType.Electrical,
  ServiceType.General,
  ServiceType.PestControl,
  ServiceType.Plumbing,
];

export interface MaintenanceRequest {
  // id in the database
  id?: string;
  // Name of the requester
  name: string;
  // Email of the requester
  email: string;
  // The unit # in the building
  unitNumber: string;
  // The type of service being requested
  serviceType: ServiceType;
  // A summary of of the issue
  summary: string;
  // Any extra details
  details?: string;
  // The status of the maintenance request
  isClosed?: boolean;
}

export interface LoginRequest {
  username: string;
  password: string;
}
