import { ParamListBase } from '@react-navigation/native';
import { CollaboratorsPropsType, SquadPropsType } from '../api/SquadService';
import { MemberPropsType } from '../api/TeamService';

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
    formType: 'create' | 'edit';
  }
  FormChartScreen: {
    editedItem?: any;
    formType: 'create' | 'edit';
  }
  FormSquadScreen: {
    editedItem?: any;
    formType: 'create' | 'edit';
  }
};

export default NavigatorParamList;
