export type CollaboratorsPropsType = {
  Id: number,
  Name: string,
  Office: string,
  Project: string,
  Squad: string,
  Company: string,
  Hired: number,
  Skills: string,
  Email: string,
  Location: string,
  Responsibilities: string,
};

export type SquadPropsType = {
  Id: number,
  Name: string,
  Description: string,
  Manager: string,
  Collaborators: CollaboratorsPropsType[];
};

export type ChartScreenPropsType = {
  team: string;
  squads: SquadPropsType[];
};
