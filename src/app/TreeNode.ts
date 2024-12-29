
export class TreeNode {
  private _utility: number = 0;
  private _visits: number = 0;
  private _move: number = 0;
  private _parent?: TreeNode | null;
  private _children: TreeNode[] = [];

  constructor(move: number = 0) {
    if (move < 0 || move > 6) {
      throw new Error("Invalid move. Expected a move between 0 and 6.");
    }
    this._move = move;
    this._children = [];
    this._parent = null;
  }

  public addChild(node: TreeNode) {
    this._children.push(node);
    node.parent = this;
  }

  get utility(): number {
    return this._utility;
  }

  set utility(value: number) {
    this._utility = value;
  }

  get visits(): number {
    return this._visits;
  }

  set visits(value: number) {
    this._visits = value;
  }

  get move(): number {
    return this._move;
  }

  set move(value: number) {
    this._move = value;
  }

  get parent(): TreeNode | null | undefined {
    return this._parent;
  }

  set parent(value: TreeNode | null) {
    this._parent = value;
  }

  get children(): TreeNode[] {
    return this._children;
  }

  set children(value: TreeNode[]) {
    this._children = value;
  }
}
