import {Images} from './imagePaths';
import {TodoListStatus} from './type/generalType';

export let FILTER_TAB_DATA: Array<{tabName: TodoListStatus; label: string}> = [
  {
    tabName: 'All_LIST',
    label: 'All List',
  },
  {
    tabName: 'ACTIVE',
    label: 'Active',
  },
  {
    tabName: 'COMPLETED',
    label: 'Completed',
  },
];
export const SORT_TODO = [
  {label: 'Id', value: 'id', icon: Images.IMG_ORDER_ICON},
  {label: 'Recent Todos', value: 'recent', icon: Images.IMG_RECENT_ICON},
];
