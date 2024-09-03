import { Experience, workStatus } from "@prisma/client";

export type ExperienceResponse = {
  id: number;
  company_name: string;
  position: string;
  status: workStatus;
  description: string;
  place: string;
  start_date: Date;
  end_date: Date;
};

export type CreateExperienceRequest = {
  company_name: string;
  position: string;
  status: workStatus;
  description: string;
  place: string;
  start_date: Date;
  end_date: Date;
};

export type UpdateExperienceRequest = {
  id: number;
  company_name?: string;
  position?: string;
  status?: workStatus;
  description?: string;
  place?: string;
  start_date?: Date;
  end_date?: Date;
};

export function toExperienceResponse(
  experience: Experience
): ExperienceResponse {
  return {
    id: experience.id,
    company_name: experience.company_name,
    position: experience.position,
    status: experience.status,
    description: experience.description,
    place: experience.place,
    start_date: new Date(experience.start_date),
    end_date: new Date(experience.end_date),
  };
}
