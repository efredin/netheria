import { ValidationError } from 'yup';
import { Engine, Octomize, octomizeSchema } from '../../src/octomize';

const baseModel: Octomize = {
  benchmark: {
    engine: Engine.TVM,
    num_trials: 2,
    runs_per_trial: 1
  },
  accelerate: {
    engine: Engine.ONNX
  },
  hardware: [
    {
      provider: 'AWS',
      instance: 'm1.test',
      cpu: 2,
      memory: 8
    },
    {
      provider: 'AWS',
      instance: 'm2.test',
      cpu: 4,
      memory: 16
    }
  ]
}

describe('Octomize Schema', () => {
  test('accepts valid models', async () => {
    const model = { ...baseModel };
    const result = await octomizeSchema.validate(model);
    expect(result).toBeDefined();
  });

  test('rejects models without hardware', async () => {
    const model = { 
      ...baseModel,
      hardware: []
    };
    await expect(octomizeSchema.validate(model))
      .rejects.toBeInstanceOf(ValidationError);
  });

  test('rejects benchmarks with invalid config', async () => {
    const model = { 
      ...baseModel,
      benchmark: {
        engine: Engine.TVM,
        num_trials: -1
      }
    };
    await expect(octomizeSchema.validate(model))
      .rejects.toBeInstanceOf(ValidationError);
  });
});
