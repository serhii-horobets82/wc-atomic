import org.apache.velocity.Template;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.VelocityEngine;
import org.apache.velocity.runtime.RuntimeConstants;
import org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader;

import java.io.File;
import java.io.IOException;
import java.io.StringWriter;
import java.nio.file.Files;
import java.nio.file.StandardOpenOption;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

public class PageComponentGenerator {

    static Set<String> IGNORE_FILES = new HashSet<>();

    static {
        IGNORE_FILES.add("index.ts");
        IGNORE_FILES.add("index.d.ts");
        IGNORE_FILES.add("_showcase");
        IGNORE_FILES.add("abstract");
        IGNORE_FILES.add("abstract-component");
        IGNORE_FILES.add("template-basis");
    }

    public static void main(String[] args) throws IOException {
        create();
    }

    public static void create() throws IOException {
        createComponentViewPages(ModuleGenerator.PROJECT_SOURCE_ROOT);
    }

    private static void createComponentViewPages(File file) throws IOException {


        for (File childFile : file.listFiles()) {
            if (childFile.isDirectory()) {
                if (IGNORE_FILES.contains(childFile.getName())) {
                    continue;
                }
                createComponentViewPages(childFile);
            }
            if (childFile.getName().endsWith(".ts")) {
                if (IGNORE_FILES.contains(childFile.getName())) {
                    continue;
                }
                String content = Files.readString(childFile.toPath());
                int lineIndex = 0;
                String customElementTag = "";
                String customElementPageTag = "";
                int indexStart = -1;
                int indexEnd = -1;
                int customElementStartIndex = -1;
                for (String line : content.lines().collect(Collectors.toList())) {

                    if (customElementPageTag.length() == 0) {
                        customElementStartIndex = line.indexOf("@customElement('");
                        if (customElementStartIndex > -1) {
                            customElementTag = line.substring(customElementStartIndex + 16, line.lastIndexOf("'"));
                            customElementPageTag = customElementTag.replace("component", "page");
                        }
                    }

                    if (customElementPageTag.length() > 0) {
                        indexStart = line.indexOf("export class") + 12;
                        indexEnd = line.indexOf("extends ");
                    }

                    if (indexStart > 11 && indexEnd > -1) {

                        String componentName = line.substring(indexStart, indexEnd).trim();

                        VelocityEngine velocityEngine = getEngine();

                        velocityEngine.init();
                        Template t = velocityEngine
                                .getTemplate("page-component.vm");

                        VelocityContext context = new VelocityContext();
                        context.put("componentName", componentName);
                        context.put("customElementTag", "<" + customElementTag + "></" + customElementTag + ">");
                        context.put("customElementPageTag", customElementPageTag);

                        StringWriter writer = new StringWriter();
                        t.merge(context, writer);

                        File page = new File(ModuleGenerator.PROJECT_SOURCE_ROOT, "_showcase/page-" + file.getName() + ".ts");
                        if (page.exists()) {
                            page.delete();
                        }
                        Files.writeString(page.toPath(), writer.toString(), StandardOpenOption.CREATE);

                    }
                }
            }
        }

    }


    public static VelocityEngine getEngine() {
        VelocityEngine velocityEngine = new VelocityEngine();
        velocityEngine.setProperty(RuntimeConstants.RESOURCE_LOADER, "classpath");
        velocityEngine.setProperty("classpath.resource.loader.class", ClasspathResourceLoader.class.getName());
        //velocityEngine.setProperty("file.resource.loader.class", ClasspathResourceLoader.class.getTypescriptName());
        velocityEngine.init();
        return velocityEngine;
    }


}
