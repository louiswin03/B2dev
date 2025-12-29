#!/usr/bin/env python3
"""
Script pour enlever le fond d'une image (logo, photo, etc.)
Utilise la bibliothèque rembg pour supprimer automatiquement le fond
"""

import os
import sys
from pathlib import Path

try:
    from rembg import remove
    from PIL import Image
except ImportError:
    print("❌ Erreur : Les bibliothèques nécessaires ne sont pas installées.")
    print("\nInstalle-les avec :")
    print("  pip install rembg pillow")
    print("\nOu avec le package complet :")
    print("  pip install 'rembg[gpu]'  # Si tu as un GPU")
    sys.exit(1)


def remove_background(input_path: str, output_path: str = None):
    """
    Enlève le fond d'une image

    Args:
        input_path: Chemin vers l'image d'entrée
        output_path: Chemin vers l'image de sortie (optionnel)
    """
    # Vérifier que le fichier existe
    if not os.path.exists(input_path):
        print(f"❌ Erreur : Le fichier '{input_path}' n'existe pas.")
        sys.exit(1)

    # Générer le nom du fichier de sortie si non fourni
    if output_path is None:
        input_file = Path(input_path)
        output_path = str(input_file.parent / f"{input_file.stem}_no_bg.png")

    print(f"📷 Traitement de : {input_path}")
    print(f"💾 Sauvegarde vers : {output_path}")

    try:
        # Ouvrir l'image
        with open(input_path, 'rb') as input_file:
            input_data = input_file.read()

        # Enlever le fond
        print("🔄 Suppression du fond en cours...")
        output_data = remove(input_data)

        # Sauvegarder l'image
        with open(output_path, 'wb') as output_file:
            output_file.write(output_data)

        print(f"✅ Terminé ! Image sauvegardée : {output_path}")

        # Afficher la taille du fichier
        output_size = os.path.getsize(output_path) / 1024  # en KB
        print(f"📊 Taille du fichier : {output_size:.2f} KB")

    except Exception as e:
        print(f"❌ Erreur lors du traitement : {e}")
        sys.exit(1)


def main():
    """Fonction principale"""
    if len(sys.argv) < 2:
        print("Usage : python remove-background.py <chemin_image> [chemin_sortie]")
        print("\nExemples :")
        print("  python remove-background.py logo.jpg")
        print("  python remove-background.py logo.jpg logo_transparent.png")
        print("  python remove-background.py ../public/images/mon-logo.png")
        sys.exit(1)

    input_path = sys.argv[1]
    output_path = sys.argv[2] if len(sys.argv) > 2 else None

    remove_background(input_path, output_path)


if __name__ == "__main__":
    main()
