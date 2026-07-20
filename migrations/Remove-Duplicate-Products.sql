-- Remove duplicate products (keep PNG versions, remove JPG versions)

-- Delete the JPG versions (duplicates)
delete from public.products where image_url in ('gorille.jpg', 'loutre.jpg', 'cheval.jpg', 'garcon.jpg', 'mouton.jpg', 'tigre.jpg', 'geisha.jpg');

-- Also remove products with null images
delete from public.products where image_url is null;
