import { TheiaTest } from './theia-test';
import { ContainerModule } from "inversify";
import { FrontendApplicationContribution } from '@theia/core/lib/browser';

export default new ContainerModule(bind => {
    bind(TheiaTest).toSelf().inSingletonScope();
    bind(FrontendApplicationContribution).toService(TheiaTest);
});
