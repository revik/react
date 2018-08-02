import { IAccessibilityBehavior, ComponentState } from '../../interfaces'
import { AbstractBehavior } from '../AbstractBehavior'
import ClickAction from '../../../actions/ClickAction'
import MenuCloseSubmenuAction from '../../../actions/MenuCloseSubmenuAction'

import { KeyCodes } from '../../../fabric/KeyCodes'

export class VerticalMenuItemBehavior extends AbstractBehavior<{}, {}>
  implements IAccessibilityBehavior<{}, {}> {
  _async: any

  constructor() {
    super('vertical-menuitem')

    this.handleKey(KeyCodes.enter, (key, event, component, props, state) => {
      event.preventDefault()
      component.executeAction(ClickAction.execute({ event }))
    })

    this.handleKey(KeyCodes.escape, (key, event, component, props, state) => {
      event.preventDefault()
      component.executeAction(MenuCloseSubmenuAction.execute({ moveFocus: true }))
    })

    this.handleKey(KeyCodes.up, (key, event, component, props, state) => {
      component.executeAction(MenuCloseSubmenuAction.execute({ moveFocus: false }))
    })

    this.handleKey(KeyCodes.down, (key, event, component, props, state) => {
      component.executeAction(MenuCloseSubmenuAction.execute({ moveFocus: false }))
    })

    this.handleBlur((event, component, props, state) => {
      console.error('blur handler behavior VERTICAL item', event, component)
    })
  }

  private attributes = {
    'ms-acc-behavior': this.name,
    role: 'menuitem',
    tabIndex: 0,
    'data-is-focusable': true,
  }

  public generateAriaAttributes(props: any, state: any): object {
    if (props.submenu) {
      this.attributes['aria-expanded'] = state['submenuOpened']
    }
    return this.attributes
  }

  public changeState(newState: ComponentState): void {}
}
