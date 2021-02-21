export interface Instruction {
  id: string;
  name: string;
  description?: string;
  instructions: string[];
  dataType?: "instruction" | undefined;
}
