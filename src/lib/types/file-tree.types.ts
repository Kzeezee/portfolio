export interface FileNode {
  name: string;
  type: "file" | "folder";
  icon?: "text" | "code" | "json" | "mail" | "svelte";
  id?: string;
  children?: FileNode[];
}
