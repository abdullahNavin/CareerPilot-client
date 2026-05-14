"use client";

import { useEffect, useState } from "react";
import { FileText, PencilLine, Plus, Trash2 } from "lucide-react";

import { AdminHeader, EmptyState } from "@/components/admin/AdminUI";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { createBlog, deleteBlog, fetchAdminBlogs, updateBlog, type BlogAdminRecord } from "@/lib/admin";

type BlogDraft = {
  title: string;
  slug: string;
  content: string;
  thumbnail: string;
  category: string;
  tags: string;
  published: boolean;
};

const emptyDraft: BlogDraft = {
  title: "",
  slug: "",
  content: "",
  thumbnail: "",
  category: "",
  tags: "",
  published: false,
};

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<BlogAdminRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogAdminRecord | null>(null);
  const [draft, setDraft] = useState<BlogDraft>(emptyDraft);

  async function load() {
    try {
      setIsLoading(true);
      const result = await fetchAdminBlogs();
      setBlogs(result.data);
      setError("");
    } catch {
      setError("We could not load the blog management workspace.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    let active = true;
    void (async () => {
      try {
        setIsLoading(true);
        const result = await fetchAdminBlogs();
        if (!active) return;
        setBlogs(result.data);
        setError("");
      } catch {
        if (!active) return;
        setError("We could not load the blog management workspace.");
      } finally {
        if (active) setIsLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  function openCreate() {
    setEditingBlog(null);
    setDraft(emptyDraft);
    setOpen(true);
  }

  function openEdit(blog: BlogAdminRecord) {
    setEditingBlog(blog);
    setDraft({
      title: blog.title,
      slug: blog.slug,
      content: blog.content,
      thumbnail: blog.thumbnail ?? "",
      category: blog.category,
      tags: blog.tags.join(", "),
      published: blog.published,
    });
    setOpen(true);
  }

  async function handleSave() {
    const payload = {
      title: draft.title,
      slug: draft.slug,
      content: draft.content,
      thumbnail: draft.thumbnail,
      category: draft.category,
      tags: draft.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      published: draft.published,
    };

    try {
      if (editingBlog) {
        await updateBlog(editingBlog.id, payload);
      } else {
        await createBlog(payload);
      }
      setOpen(false);
      await load();
    } catch {
      setError("We could not save the blog post.");
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteBlog(id);
      await load();
    } catch {
      setError("We could not delete the blog post.");
    }
  }

  return (
    <div className="space-y-8">
      <AdminHeader
        eyebrow="Blog management"
        title="Blogs"
        description="Create, edit, publish, unpublish, and organize editorial content with slug, thumbnail, and tags."
        icon={FileText}
        aside={
          <>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Published posts</p>
            <p className="mt-3 text-3xl font-semibold">{isLoading ? "..." : blogs.filter((blog) => blog.published).length}</p>
            <p className="mt-1 text-sm text-muted-foreground">Public-facing blog entries currently live.</p>
          </>
        }
      />

      {error ? <div className="rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">{error}</div> : null}

      <Card>
        <CardHeader className="gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <CardTitle className="text-lg">Editorial Workspace</CardTitle>
            <CardDescription>Rich text content, tags, categories, and publishing state.</CardDescription>
          </div>
          <Button variant="premium" onClick={openCreate}><Plus className="mr-2 h-4 w-4" /> New Blog</Button>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">{Array.from({ length: 5 }, (_, index) => <Skeleton key={index} className="h-28 w-full" />)}</div>
          ) : blogs.length === 0 ? (
            <EmptyState title="No blog posts yet" description="Create the first post to populate the content pipeline." />
          ) : (
            <div className="space-y-3">
              {blogs.map((blog) => (
                <div key={blog.id} className="surface-subtle flex flex-col gap-4 rounded-2xl p-4 xl:flex-row xl:items-center xl:justify-between">
                  <div className="max-w-3xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold">{blog.title}</p>
                      <Badge variant={blog.published ? "success" : "outline"}>{blog.published ? "Published" : "Draft"}</Badge>
                      <Badge variant="premium">{blog.category}</Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">/{blog.slug} • {blog.user.name}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {blog.tags.map((tag) => <Badge key={tag} variant="outline">{tag}</Badge>)}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" onClick={() => openEdit(blog)}><PencilLine className="mr-2 h-4 w-4" /> Edit</Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => void updateBlog(blog.id, { published: !blog.published }).then(load).catch(() => setError("We could not update publish state."))}
                    >
                      {blog.published ? "Unpublish" : "Publish"}
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => void handleDelete(blog.id)}><Trash2 className="mr-2 h-4 w-4" /> Delete</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingBlog ? "Edit Blog" : "Create Blog"}</DialogTitle>
            <DialogDescription>Author a post with title, slug, content, thumbnail, status, and tags.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Title"><Input value={draft.title} onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))} /></Field>
            <Field label="Slug"><Input value={draft.slug} onChange={(event) => setDraft((current) => ({ ...current, slug: event.target.value }))} /></Field>
            <Field label="Category"><Input value={draft.category} onChange={(event) => setDraft((current) => ({ ...current, category: event.target.value }))} /></Field>
            <Field label="Thumbnail URL"><Input value={draft.thumbnail} onChange={(event) => setDraft((current) => ({ ...current, thumbnail: event.target.value }))} /></Field>
            <div className="md:col-span-2">
              <Field label="Tags"><Input value={draft.tags} onChange={(event) => setDraft((current) => ({ ...current, tags: event.target.value }))} placeholder="career, frontend, interview" /></Field>
            </div>
            <div className="md:col-span-2">
              <Field label="Content"><Textarea value={draft.content} onChange={(event) => setDraft((current) => ({ ...current, content: event.target.value }))} className="min-h-[260px]" /></Field>
            </div>
            <label className="flex items-center gap-3 text-sm font-medium md:col-span-2">
              <input type="checkbox" checked={draft.published} onChange={(event) => setDraft((current) => ({ ...current, published: event.target.checked }))} />
              Publish immediately
            </label>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="premium" onClick={() => void handleSave()}>Save Blog</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      {children}
    </div>
  );
}
