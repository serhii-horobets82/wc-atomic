import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.StandardOpenOption;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Generate wc-atomic imports and exports...
 */
public class ModuleGenerator {

    public static File PROJECT_SOURCE_ROOT = new File("source");

    private static Set<String> IGNORE_FILES = new HashSet<>();

    static {
        IGNORE_FILES.add("index.ts");
        IGNORE_FILES.add("index.d.ts");
        IGNORE_FILES.add("_showcase");
    }

    public static void main(String[] args) throws IOException {

        String imports = createImports();
        String exports = createExports();

        File indexts = new File(PROJECT_SOURCE_ROOT, "index.ts");
        Files.writeString(indexts.toPath(), imports + exports, StandardOpenOption.CREATE);

    }


    public static String createImports() throws IOException {
        List<String> items = createImportStatement(PROJECT_SOURCE_ROOT);

        String output = "";
        for (String item : items) {
            output += item + "\n";
        }
        return output;
    }

    private static List<String> createImportStatement(File file) throws IOException {
        List<String> imports = new ArrayList<>();
        for (File childFile : file.listFiles()) {
            if (childFile.isDirectory()) {
                if (IGNORE_FILES.contains(childFile.getName())) {
                    continue;
                }
                imports.addAll(createImportStatement(childFile));
            }
            if (childFile.getName().endsWith(".ts")) {
                if (IGNORE_FILES.contains(childFile.getName())) {
                    continue;
                }
                System.out.println("parse file: " + file.getAbsolutePath());
                String importStatement = "import {";
                String content = Files.readString(childFile.toPath());
                int lineIndex = 0;
                for (String line : content.lines().collect(Collectors.toList())) {
                    int index = line.indexOf("class ");
                    if (index > -1) {
                        int endIndex = -1;
                        if (line.indexOf("{") != -1) {
                            endIndex = line.indexOf("{");
                        }
                        if (line.indexOf("extends") != -1) {
                            endIndex = line.indexOf("extends");
                        }
                        if (line.indexOf("<") != -1 && line.indexOf("<") < endIndex) {
                            endIndex = line.indexOf("<");
                        }
                        String substring = line.substring(index + 5, endIndex).trim();
                        if (lineIndex > 0) {
                            importStatement = String.format("%s,", importStatement);
                        }
                        importStatement = String.format("%s%s", importStatement, substring);
                        lineIndex++;
                    }
                }
                importStatement += "} from '" + getPath(childFile) + "';";
                imports.add(importStatement);
            }
        }
        return imports;

    }

    public static String createExports() throws IOException {
        List<String> items = createExportStatement(PROJECT_SOURCE_ROOT);

        items.add("import './scss/index.scss';");
        items.add("import './_showcase/showcase-app';");

        String output = "";
        for (String item : items) {
            output += item + "\n";
        }
        return output;
    }

    private static List<String> createExportStatement(File file) throws IOException {
        List<String> exports = new ArrayList<>();
        for (File childFile : file.listFiles()) {
            if (childFile.isDirectory()) {
                if (IGNORE_FILES.contains(childFile.getName())) {
                    continue;
                }
                exports.addAll(createExportStatement(childFile));
            }
            if (childFile.getName().endsWith(".ts")) {
                if (IGNORE_FILES.contains(childFile.getName())) {
                    continue;
                }
                String exportStatement = "export {";
                String content = Files.readString(childFile.toPath());
                int lineIndex = 0;
                for (String line : content.lines().collect(Collectors.toList())) {
                    int index = line.indexOf("class ");
                    if (index > -1) {
                        int endIndex = -1;
                        if (line.indexOf("{") != -1) {
                            endIndex = line.indexOf("{");
                        }
                        if (line.indexOf("extends") != -1) {
                            endIndex = line.indexOf("extends");
                        }
                        if (line.indexOf("<") != -1 && line.indexOf("<") < endIndex) {
                            endIndex = line.indexOf("<");
                        }
                        String substring = line.substring(index + 5, endIndex).trim();
                        if (lineIndex > 0) {
                            exportStatement = String.format("%s,", exportStatement);
                        }
                        exportStatement = String.format("%s%s", exportStatement, substring);
                        lineIndex++;
                    }
                }
                exportStatement += "} from '" + getPath(childFile) + "';";
                exports.add(exportStatement);
            }
        }
        return exports;

    }

    private static String getPath(File childFile) {
        return String.format(".%s", childFile.getAbsolutePath().replace(PROJECT_SOURCE_ROOT.getAbsolutePath(), "").replace("\\", "/").replace(".ts", ""));
    }

}

