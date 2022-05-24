import {
  Button,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Popover,
  MessageBox,
  Avatar,
  Message,
  Input,
  Dialog,
  Tooltip,
  Pagination,
  Tag,
  RadioGroup,
  RadioButton,
  DatePicker,
  Table,
  TableColumn,
  Loading,
  Checkbox,
  Select,
  Option,
  Switch,
  Cascader,
  CascaderPanel,
  Rate,
  Form,
  FormItem,
  Carousel,
  CarouselItem,
  Popconfirm,
  Tabs,
  TabPane,
} from 'element-ui'

const element = {
  install(Vue) {
    Vue.use(Button)
    Vue.use(Menu)
    Vue.use(Submenu)
    Vue.use(MenuItem)
    Vue.use(Popover)
    Vue.use(Avatar)
    Vue.use(Input)
    Vue.use(Dialog)
    Vue.use(Tooltip)
    Vue.use(Tag)
    Vue.use(Pagination)
    Vue.use(RadioGroup)
    Vue.use(RadioButton)
    Vue.use(DatePicker)
    Vue.use(Table)
    Vue.use(TableColumn)
    Vue.use(Checkbox)
    Vue.use(Loading.directive)
    Vue.use(Checkbox)
    Vue.use(Select)
    Vue.use(Option)
    Vue.use(Switch)
    Vue.use(Cascader)
    Vue.use(CascaderPanel)
    Vue.use(Rate)
    Vue.use(Form)
    Vue.use(FormItem)
    Vue.use(MenuItemGroup)
    Vue.use(Carousel)
    Vue.use(CarouselItem)
    Vue.use(Popconfirm)
    Vue.use(Tabs)
    Vue.use(TabPane)
    Vue.prototype.$message = Message
    Vue.prototype.$alert = MessageBox.alert
    Vue.prototype.$confirm = MessageBox.confirm
  },
}
export default element
