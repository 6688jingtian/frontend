moduleName=$1;
mkdir "${moduleName}";
cd "${moduleName}";
touch index.js;
touch "${moduleName}".controller.js;
touch "${moduleName}".routes.js;
touch "${moduleName}".html;
touch "${moduleName}".less;
chmod -R 777 "${moduleName}";