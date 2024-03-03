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
};

export type OverviewScreenPropsType = {
  team: string;
  userType: string;
  members: MemberPropsType[];
};

export const teamList = {
  team: 'Omni Bulls',
  userType: AccessTypeEnum.ADMIN,
  members: [
    {
      Id: 1,
      Main: true,
      Structure: TeamStructureEnum.EQUIPE,
      Name: 'Edi Piovezani',
      Type: 'CO do projeto',
    },
    {
      Id: 2,
      Main: false,
      Structure: TeamStructureEnum.EQUIPE,
      Name: 'Sandra',
      Type: 'Gerente de portifólio',
    },
    {
      Id: 3,
      Main: false,
      Structure: TeamStructureEnum.ORGANOGRAMA,
      Name: 'Organograma das squads',
      Type: 'Omni Bulls',
    },
  ]
};
