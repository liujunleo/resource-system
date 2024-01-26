import type { App } from 'vue'
import { Button } from './Button'
import {
  Input,
  Layout,
  Form,
  Radio,
  DatePicker,
  Select,
  Tabs,
  InputNumber,
  Descriptions,
  Tag,
} from 'ant-design-vue'

export function registerGlobComp(app: App) {
  app
    .use(Input)
    .use(Button)
    .use(Layout)
    .use(Form)
    .use(Radio)
    .use(DatePicker)
    .use(Select)
    .use(Tabs)
    .use(InputNumber)
    .use(Descriptions)
    .use(Tag)
}
