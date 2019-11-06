import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.StandardOpenOption;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class ModuleGenerator {

    private static File projectSourceRoot = new File("source");

    private static Set<String> ignoreFiles = new HashSet<>();

    static {
        ignoreFiles.add("index.ts");
        ignoreFiles.add("index.d.ts");
        ignoreFiles.add("_showcase");
    }

    public static void main(String[] args) throws IOException {

        List<String> items = createExportStatement(projectSourceRoot);
        items.add("import './scss/index.scss';");
        items.add("import './_showcase/showcase-app';");

        String output = "";
        for (String item : items) {
            output += item + "\n";
        }
        File indexts = new File(projectSourceRoot, "index.ts");
        Files.writeString(indexts.toPath(), output, StandardOpenOption.CREATE);

    }

    private static List<String> createExportStatement(File file) throws IOException {
        List<String> retval = new ArrayList<>();
        for (File childFile : file.listFiles()) {
            if (childFile.isDirectory()) {
                if (ignoreFiles.contains(childFile.getName())) {
                    continue;
                }
                retval.addAll(createExportStatement(childFile));
            }
            if (childFile.getName().endsWith(".ts")) {
                if (ignoreFiles.contains(childFile.getName())) {
                    continue;
                }
                System.out.println("parse file: " + file.getAbsolutePath());
                String importStatement = "import {";
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
                            importStatement = String.format("%s,", importStatement);
                            exportStatement = String.format("%s,", exportStatement);
                        }
                        importStatement = String.format("%s%s", importStatement, substring);
                        exportStatement = String.format("%s%s", exportStatement, substring);
                        lineIndex++;
                    }
                }
                importStatement += "} from '" + getPath(childFile) + "';";
                exportStatement += "} from '" + getPath(childFile) + "';";
                retval.add(importStatement);
                retval.add(exportStatement);
            }
        }
        return retval;

    }

    private static String getPath(File childFile) {
        return String.format(".%s", childFile.getAbsolutePath().replace(projectSourceRoot.getAbsolutePath(), "").replace("\\", "/").replace(".ts", ""));
    }

}
