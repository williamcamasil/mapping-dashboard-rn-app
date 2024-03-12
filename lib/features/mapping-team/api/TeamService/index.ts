import { AccessTypeEnum, TeamStructureEnum } from "./utils";

export const serviceTeamList = {
  team: 'Omni Bulls',
  userType: AccessTypeEnum.ADMIN,
  members: [
    {
      Id: 1,
      Main: true,
      Structure: TeamStructureEnum.EQUIPE,
      Name: 'Edi Matias',
      Type: 'CO do projeto',
      Collaborator: {
        Id: 1,
        Name: 'Edi Matias',
        Office: 'CO do projeto',
        Project: 'Omni Bulls',
        Squad: '',
        Company: 'Omni',
        Hired: 1997,
        Skills: 'Gerir times',
        Email: 'edi.matias@omni.com.br',
        Location: 'São Paulo (Capital)',
        Responsibilities: 'Gestão de projetos',
      }
    },
    {
      Id: 2,
      Main: false,
      Structure: TeamStructureEnum.EQUIPE,
      Name: 'Sandra',
      Type: 'Gerente de portfólio',
      Collaborator: {
        Id: 1,
        Name: 'Sandra',
        Office: 'Gerente de portfólio',
        Project: 'Omni Bulls',
        Squad: '',
        Company: 'DB1',
        Hired: 1997,
        Skills: 'Gerir times',
        Email: 'sandra.larezzi@db1.com.br',
        Location: 'Ceará (Capital)',
        Responsibilities: 'Gestão de projetos',
      }
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
