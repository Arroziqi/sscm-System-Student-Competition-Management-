import { Category, Competition, Predicate, Region } from "@prisma/client"

export type CompetitionResponse= {
  id: number,
  name: string,
  year: Date,
  region: Region,
  category: Category,
  predicate: Predicate,
}

export type CreateCompetitionRequest = {
  name: string,
  year: Date,
  region: Region,
  category: Category,
  predicate: Predicate,
}

export type UpdateCompetitionRequest = {
  id: number,
  name?: string,
  year?: Date,
  region?: Region,
  category?: Category,
  predicate?: Predicate,
}

export type SearchCompetitionRequest = {
  name?: string,
  year?: Date,
  region?: Region,
  category?: Category,
  predicate?: Predicate,
  page: number,
  size: number
}

export function toCompetitionResponse(comp: Competition): CompetitionResponse{
  return {
    id: comp.id,
    name: comp.name,
    year: comp.year,
    region: comp.region,
    category: comp.category,
    predicate: comp.predicate,
  }
}