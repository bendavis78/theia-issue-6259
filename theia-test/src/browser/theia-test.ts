import { injectable, inject, postConstruct } from "inversify";
import { CommandRegistry, MenuModelRegistry } from "@theia/core/lib/common";
import { CommonMenus } from "@theia/core/lib/browser";
import { FrontendApplicationContribution } from '@theia/core/lib/browser';

@injectable()
export class TheiaTest implements FrontendApplicationContribution {
    @inject(MenuModelRegistry) protected readonly menuModel: MenuModelRegistry;
    @inject(CommandRegistry) protected readonly commandRegistry: CommandRegistry;

    onStart(): void {}
    
    @postConstruct()
    init(): void {
        /**
         * Adding menu items immediately:
         */
        this.commandRegistry.registerCommand({ id: 'test-immediate-command' }, {
            execute: () => console.log('test immediate command')
        });
        this.menuModel.registerMenuAction(CommonMenus.HELP, {
            commandId: 'test-immediate-command',
            label: 'Test Immedate'
        });


        /**
         * Adding menu items asynchronously:
         */
        setTimeout(() => {
            this.commandRegistry.registerCommand({ id: 'test-async-command' }, {
                execute: () => console.log('test async command')
            });
            this.menuModel.registerMenuAction(CommonMenus.HELP, {
                commandId: 'test-async-command',
                label: 'Test Async'
            });
        }, 1000);
    }
}
