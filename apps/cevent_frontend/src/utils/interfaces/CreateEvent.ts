export interface Activity {
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  capacity: number;
  createdAt: string;
}

export interface ActivitiesProps {
  onAddActivity: (activity: Activity) => void;
}

export interface OnCompleteCallback {
  (
    FieldsGeneralInfo: {
      title: string;
      shortDescription: string;
      description: string;
      categoryId: number;
    },
    isComplete: boolean,
  ): void;
}

export interface FieldsGeneralInfo {
  title: string;
  shortDescription: string;
  description: string;
  categoryId: number;
}

export interface ImageUploadProps {
  selectedImage: string | null;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface FieldsPriceCapacity {
  capacity: number;
  ticketPrice: number;
}

export interface PriceCapacityProps {
  onComplete: (fields: FieldsPriceCapacity, isComplete: boolean) => void;
}
