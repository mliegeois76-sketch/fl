-- Add 7 new artworks to the products collection
-- This migration should be applied in the Supabase SQL Editor

-- Insert new artworks
insert into public.products (name, price, description, category, stock, image_url) values
('L''Âme des Forêts', 12500.00, 'Une étude magistrale en bronze patiné. Le regard profond et les textures brutes rappellent la puissance indomptée et la mélancolie de la nature sauvage.', 'Sculpture', 1, 'gorilla.png'),
('L''Éveil Marin', 8200.00, 'Sculptée dans une pierre veinée délicate, cette pièce capture la douceur fluide d''une loutre en mouvement. Une ode à l''équilibre et à la grâce aquatique.', 'Sculpture', 1, 'loutre.png'),
('L''Héritage Obscur', 15000.00, 'Une pièce imposante en bronze noirci, aux arêtes vives et aux contrastes marqués. Elle symbolise la noblesse, la force brute et la tension nerveuse de l''animal.', 'Sculpture', 1, 'horse.png'),
('Le Regard Intemporel', 9800.00, 'Un buste d''une sensibilité rare en bronze patiné. Les traits fins et l''expression songeuse invitent à une introspection profonde sur la jeunesse et l''identité.', 'Sculpture', 1, 'boy.png'),
('Pureté Épurée', 7500.00, 'Une sculpture en céramique blanche immaculée aux lignes minimalistes. Une pièce qui joue sur la lumière et les ombres pour magnifier la simplicité du sujet.', 'Sculpture', 1, 'sheep.png'),
('Le Guetteur des Ombres', 14200.00, 'En bronze texturé, cette tête de tigre dégage une autorité naturelle. La précision des détails donne une intensité saisissante à cette figure de prédateur majestueux.', 'Sculpture', 1, 'tiger.png'),
('L''Éclat de Kyoto', 18500.00, 'Une œuvre raffinée capturant l''élégance cérémonielle. Chaque détail de la coiffure et du port de tête témoigne d''un savoir-faire artisanal dédié à la beauté traditionnelle.', 'Sculpture', 1, 'geisha.png');
