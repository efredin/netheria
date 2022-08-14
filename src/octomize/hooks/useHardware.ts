import hardwareConfig from '../hardware.yaml';
import { Instance } from '..';
import { useQuery } from "react-query";

const hardware = hardwareConfig as Instance[];

export const useHardware = (provider?: string) => {
  return useQuery<Instance[]>(['hardware', provider], async () => {
    const filteredHardware = provider ? hardware.filter(h => h.provider === provider) : hardware;
    filteredHardware.sort();
    return filteredHardware;
  });
}
