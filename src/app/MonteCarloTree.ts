

class MonteCarloTree {
  private root: TreeNode;

  constructor(node: TreeNode) {
    this.root = node;
  }

  public addNode(parent: TreeNode, child:TreeNode) {
    parent.addChild(child);
    child.parent = parent;
  }

  public isLeaf(node: TreeNode) {
    return node.children?.length === 0;
  }
}

