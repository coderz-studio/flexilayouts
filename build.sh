#!/bin/bash
# Build script for flexilayouts WordPress plugin
# Creates flexilayouts.zip with only production files

PLUGIN_NAME="flexilayouts"
BUILD_DIR="build_temp_$PLUGIN_NAME"
ZIP_NAME="$PLUGIN_NAME.zip"

# Clean up any previous build
rm -rf "$BUILD_DIR" "$ZIP_NAME"

# Create build directory
mkdir "$BUILD_DIR"

# Create necessary directories
mkdir -p "$BUILD_DIR/includes"
mkdir -p "$BUILD_DIR/build"
mkdir -p "$BUILD_DIR/languages"
mkdir -p "$BUILD_DIR/assets"

# Copy root files
cp -r *.php "$BUILD_DIR"/ 2>/dev/null || true
cp -r *.txt "$BUILD_DIR"/ 2>/dev/null || true

# Copy build assets
if [ -d "build" ]; then
    cp -r build/* "$BUILD_DIR/build/" 2>/dev/null || true
fi

# Copy other necessary directories
if [ -d "assets" ]; then
    cp -r assets/* "$BUILD_DIR/assets/" 2>/dev/null || true
fi

if [ -d "languages" ]; then
    cp -r languages/* "$BUILD_DIR/languages/" 2>/dev/null || true
fi

if [ -d "includes" ]; then
    cp -r includes/*.php "$BUILD_DIR/includes/" 2>/dev/null || true
fi

# Remove development files
rm -rf "$BUILD_DIR/node_modules" \
       "$BUILD_DIR/.git" \
       "$BUILD_DIR/.vscode" \
       "$BUILD_DIR/*.log" \
       "$BUILD_DIR/*.map" \
       "$BUILD_DIR/*.scss" \
       "$BUILD_DIR/webpack.config.js" \
       "$BUILD_DIR/package*.json" 2>/dev/null || true

# Zip it up
cd "$BUILD_DIR"
zip -r "../$ZIP_NAME" .
cd ..

# Clean up temp build dir
rm -rf "$BUILD_DIR"

echo "Build complete: $ZIP_NAME"
