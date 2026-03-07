export function toSlug(name) {
    return name.toLowerCase().replace(/['']/g, '').replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
}

export function fromSlug(slug) {
  return slug.replace(/_/g, ' ');
}