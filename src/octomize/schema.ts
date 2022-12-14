import { object, string, number, array, InferType } from 'yup';
import { uniqWith } from 'lodash';

export const instanceSchema = object({
  provider: string().required(),
  instance: string().required(),
  cpu: number().required(),
  memory: number().required()
});

export enum Engine {
  ONNX = 'ONNX',
  TVM = 'TVM'
}

export const benchmarkSchema = object({
  engine: string().oneOf(Object.values(Engine)),
  num_trials: number().min(1).default(1),
  runs_per_trial: number().min(1).default(1)
});

export const accelerateSchema = object({
  engine: string().oneOf(Object.values(Engine))
});

export const octomizeSchema = object({
  hardware: array(instanceSchema).min(1)
    .test(
      'unique',
      'Duplicate hardware detected',
      value => !value || value.length === uniqWith(value, (a, b) => a.provider === b.provider && a.instance === b.instance ).length
    ).required(),
  benchmark: benchmarkSchema.optional(),
  accelerate: accelerateSchema.optional()
}).test(
  'minJobs',
  'At least one benchmark or accelerate job is required.',
  value => !!value.accelerate || !!value.benchmark
);

export type Instance = InferType<typeof instanceSchema>;
export type Benchmark = InferType<typeof benchmarkSchema>;
export type Accelerate = InferType<typeof accelerateSchema>;
export type Octomize = InferType<typeof octomizeSchema>;
