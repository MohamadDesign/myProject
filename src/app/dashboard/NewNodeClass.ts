export default class NewNodeClass {
  constructor(
    public nodeId: string,
    public group: number = 0,
    public source: string = "",
    public target: string = ""
  ) {}
}
