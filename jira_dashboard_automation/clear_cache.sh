#!/bin/bash
# Clear Python cache files

echo "Clearing Python cache files..."

# Remove __pycache__ directories
find . -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null

# Remove .pyc files
find . -type f -name "*.pyc" -delete 2>/dev/null

# Remove .pyo files
find . -type f -name "*.pyo" -delete 2>/dev/null

echo "✓ Cache cleared successfully!"
echo ""
echo "Now you can run the script again:"
echo "  python3 create_dashboards.py --create-filters"

# Made with Bob
