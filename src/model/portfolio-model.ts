import { Portfolio } from "@prisma/client";

// TODO: add type portfolio response
export type PortfolioResponse = {
  id: number;
  full_name: string;
  place_of_birth: string;
  date_of_birth: Date;
  phone_number: string;
  linkedin?: string | null;
  github?: string | null;
  instagram?: string | null;
  website?: string | null;
  domicile: string;
  summary?: string | null;
};

// TODO: add type portfolio create request
export type CreatePortfolioRequest = {
  full_name: string;
  place_of_birth: string;
  date_of_birth: Date;
  phone_number: string;
  linkedin?: string;
  github?: string;
  instagram?: string;
  website?: string;
  domicile: string;
  summary?: string;
}

// TODO: add type portfolio update request
export type UpdatePortfolioRequest = {
  // id: number;
  full_name?: string;
  place_of_birth?: string;
  date_of_birth?: Date;
  phone_number?: string;
  linkedin?: string;
  github?: string;
  instagram?: string;
  website?: string;
  domicile?: string;
  summary?: string;
}

// TODO: create function to convert portfolio to portfolio response
export function toPortfolioResponse(portfolio: Portfolio): PortfolioResponse{
  return {
    id: portfolio.id,
    full_name: portfolio.full_name,
    place_of_birth: portfolio.place_of_birth,
    date_of_birth: portfolio.date_of_birth,
    phone_number: portfolio.phone_number,
    linkedin: portfolio.linkedin,
    github: portfolio.github,
    instagram: portfolio.instagram,
    website: portfolio.website,
    domicile: portfolio.domicile,
    summary: portfolio.summary
  }
}