import { Activity } from "@prisma/client"

export type ActivityResponse = {
  id: number
  organization_name: string
  role: string
  description: string
  place: string
  start_date: Date
  end_date: Date
}

export type CreateActivityRequest = {
  organization_name: string
  role: string
  description: string
  place: string
  start_date: Date
  end_date: Date
}

export type UpdateActivityRequest = {
  id: number
  organization_name?: string
  role?: string
  description?: string
  place?: string
  start_date?: Date
  end_date?: Date
}

export async function toActivityResponse(activity: Activity): Promise<ActivityResponse> {
  return {
    id: activity.id,
    organization_name: activity.organization_name,
    role: activity.role,
    description: activity.description,
    place: activity.place,
    start_date: new Date(activity.start_date),
    end_date: new Date(activity.end_date),
  }
}