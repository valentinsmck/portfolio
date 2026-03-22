import re

files_info = [
    ("index.html", "home", "Accueil"),
    ("Parcours.html", "timeline", "Parcours"),
    ("Projets.html", "code", "Projets"),
    ("Veille.html", "visibility", "Veille"),
    ("Competences.html", "psychology", "Compétences")
]

base_nav = """<!-- Mobile Bottom Navigation -->
<nav class="fixed bottom-0 w-full md:hidden bg-[#fafaf3] border-t border-outline-variant/10 flex justify-around items-center py-3 px-2 z-40 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)]">
{_LINKS_}
</nav>"""

for f, act_icon, act_label in files_info:
    links = []
    for f2, icon, label in files_info:
        if f2 == f:
            links.append(f'<a class="flex flex-col items-center gap-1 text-primary" href="{f2}">\n<span class="material-symbols-outlined text-2xl" data-icon="{icon}" style="font-variation-settings: \'FILL\' 1;">{icon}</span>\n<span class="text-[10px] font-bold uppercase">{label}</span>\n</a>')
        else:
            links.append(f'<a class="flex flex-col items-center gap-1 text-on-surface-variant hover:text-primary transition-colors" href="{f2}">\n<span class="material-symbols-outlined text-2xl" data-icon="{icon}">{icon}</span>\n<span class="text-[10px] font-bold uppercase">{label}</span>\n</a>')
    
    try:
        with open(f, "r", encoding="utf-8") as file:
            content = file.read()
            
        nav_str = base_nav.replace("{_LINKS_}", "\n".join(links))
        
        # Match <nav up to </nav> where the element contains "bottom" somewhere inside its open tag
        new_content = re.sub(r'<nav[^>]*bottom[^>]*>.*?</nav>', nav_str, content, flags=re.DOTALL)
        
        # Ensure we also remove any preceding comments like <!-- Bottom Mobile Nav --> if needed, 
        # but replacing the <nav...>...</nav> is safe enough. The old comment will just stay or be replaced if we matched it.
        # Actually I can replace <!-- Bottom Navigation (Mobile) --> or similar if present, but this regex is safe enough.
        
        new_content = re.sub(r'<!--[^>]*Bottom[^>]*Nav[^>]*-->\s*<!-- Mobile Bottom Navigation -->', '<!-- Mobile Bottom Navigation -->', new_content, flags=re.IGNORECASE)
        
        with open(f, "w", encoding="utf-8") as file:
            file.write(new_content)
    except FileNotFoundError:
        print(f"Skipping {f}, not found.")

print("Updated all navs!")
