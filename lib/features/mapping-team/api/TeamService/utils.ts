import { CollaboratorsPropsType } from "../SquadService/utils";

export enum TeamStructureEnum {
  EQUIPE = 'EQUIPE',
  ORGANOGRAMA = 'ORGANOGRAMA',
};

export enum AccessTypeEnum {
  ADMIN = 'ADMIN',
  NORMAL = 'NORMAL',
};

export type MemberPropsType = {
  Id: number,
  Main: boolean,
  Structure: string,
  Name: string,
  Type: string,
  Collaborator?: CollaboratorsPropsType;
};

export type OverviewScreenPropsType = {
  team: string;
  userType: string;
  members: MemberPropsType[];
};

export type FormType = 'create' | 'edit';
