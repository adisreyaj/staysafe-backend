/*
 * File: world.controller.spec.ts
 * Project: staysafe-server
 * File Created: Sunday, 5th April 2020 5:17:56 pm
 * Author: Adithya Sreyaj
 * -----
 * Last Modified: Sunday, 5th April 2020 5:23:05 pm
 * Modified By: Adithya Sreyaj<adi.sreyaj@gmail.com>
 * -----
 */

import { Test, TestingModule } from '@nestjs/testing';
import { WorldController } from './world.controller';

describe('World Controller', () => {
  let controller: WorldController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorldController],
    }).compile();

    controller = module.get<WorldController>(WorldController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
