export interface ActivityInputDto {
  name: string;
  description: string;
  startTime: Date;
  endTime: Date;
  capacity: number;
}

export interface ActivityErrors {
  title: string;
  description: string;
  capacity: string;
  startTime: string;
  endTime: string;
}
