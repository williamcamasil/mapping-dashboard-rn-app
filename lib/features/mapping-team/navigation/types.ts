import { ParamListBase } from '@react-navigation/native';
import { CollaboratorsPropsType, SquadPropsType } from '../api/SquadService';
import { FormType, MemberPropsType } from '../api/TeamService';

type NavigatorParamList = ParamListBase & {
  OverviewScreen: undefined;
  ChartScreen: undefined;
  CollaboratorScreen: {
    itemSelected: CollaboratorsPropsType;
  };
  SquadScreen: {
    itemSelected: SquadPropsType;
  }
  FormOverviewScreen: {
    editedItem?: MemberPropsType;
    formType: FormType;
  }
  FormChartScreen: {
    editedItem?: any;
    formType: FormType;
  }
  FormSquadScreen: {
    editedItem?: CollaboratorsPropsType;
    formType: FormType;
  }
};

export default NavigatorParamList;
