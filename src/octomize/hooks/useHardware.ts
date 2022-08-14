import hardwareConfig from '../hardware.yaml';
import { Hardware } from '..';
import { useQuery } from "react-query";

const hardware = hardwareConfig as Hardware[];

export const useHardware = (provider?: string) => {
  return useQuery<Hardware[]>(['hardware', provider], async () => {
    const filteredHardware = provider ? hardware.filter(h => h.provider === provider) : hardware;
    filteredHardware.sort();
    return filteredHardware;
  });
}
