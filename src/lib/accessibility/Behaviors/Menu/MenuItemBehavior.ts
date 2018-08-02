import { IAccessibilityBehavior, ComponentState } from '../../interfaces'
import { AbstractBehavior } from '../AbstractBehavior'
import ClickAction from '../../../actions/ClickAction'
import MenuCloseSubmenuAction from '../../../actions/MenuCloseSubmenuAction'
import MenuOpenSubmenuAction from '../../../actions/MenuOpenSubmenuAction'

import { KeyCodes } from '../../../fabric/KeyCodes'

export class MenuItemBehavior extends AbstractBehavior<{}, {}>
  implements IAccessibilityBehavior<{}, {}> {
  _async: any

  private isManagingFocus: boolean = false
  private timeoutId: any

  constructor() {
    super('menuitem')

    this.handleKey(KeyCodes.enter, (key, event, component, props, state) => {
      event.preventDefault()
      component.executeAction(ClickAction.execute({ event }))
    })

    this.handleKey(KeyCodes.escape, (key, event, component, props, state) => {
      event.preventDefault()
      component.executeAction(MenuCloseSubmenuAction.execute({ moveFocus: true }))
    })

    this.handleKey(KeyCodes.down, (key, event, component, props, state) => {
      event.preventDefault()
      component.executeAction(MenuOpenSubmenuAction.execute({ moveFocus: true }))
    })

    this.handleKey(KeyCodes.right, (key, event, component, props, state) => {
      component.executeAction(MenuCloseSubmenuAction.execute({ moveFocus: false }))
    })

    this.handleKey(KeyCodes.left, (key, event, component, props, state) => {
      component.executeAction(MenuCloseSubmenuAction.execute({ moveFocus: false }))
    })

    // this.handleBlur((event, component, props, state) => {

    //   console.warn('blur handler behavior item', event, component)

    //   this.timeoutId = setTimeout(() => {
    //     if (this.isManagingFocus) {
    //       this.isManagingFocus = false;
    //     }

    //    console.warn('isManagingFocus blur', this.isManagingFocus)
    //     return;
    //   }, 0);

    //   console.warn('event.stopPropagation()')

    // })

    // this.handleFocus((event, component, props, state) => {
    //   console.warn('focus handler behavior', event, component)

    //   clearTimeout(this.timeoutId);
    //   if (!this.isManagingFocus) {
    //     this.isManagingFocus = true;
    //   }

    //   console.warn('isManagingFocus focus', this.isManagingFocus)

    // })
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
