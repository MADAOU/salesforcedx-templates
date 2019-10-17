/*
 * Copyright (c) 2019, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import { flags } from '@salesforce/command';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import ApexClassGenerator from '../../../../generators/apexClassGenerator';
import { CreateUtil, TemplateCommand } from '../../../../utils';

Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('salesforcedx-templates', 'messages');
const apexClassFileSuffix = /.cls$/;

export default class ApexClass extends TemplateCommand {
  public static examples = [
    '$ sfdx force:apex:class:create -n MyClass',
    '$ sfdx force:apex:class:create -n MyClass -d classes'
  ];

  public static description = messages.getMessage(
    'ApexClassCommandDescription'
  );

  protected static flagsConfig = {
    classname: flags.string({
      char: 'n',
      description: messages.getMessage('NameFlagDescription'),
      required: true
    }),
    outputdir: flags.string({
      char: 'd',
      description: messages.getMessage('outputdir'),
      required: false,
      default: process.cwd()
    }),
    // Need to fix the apiversion flag with default and optional inputs
    apiversion: flags.builtin(),
    template: flags.string({
      char: 't',
      description: messages.getMessage('template'),
      default: 'DefaultApexClass',
      options: CreateUtil.getCommandTemplatesForFiletype(
        apexClassFileSuffix,
        'apexclass'
      )
    })
  };

  public async run(): Promise<AnyJson> {
    CreateUtil.checkInputs(this.flags.classname);
    CreateUtil.checkInputs(this.flags.template);

    return this.runGenerator(ApexClassGenerator);
  }
}
