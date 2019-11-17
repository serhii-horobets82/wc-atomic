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
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class ShowcaseAppGenerator {

    static Set<String> IGNORE_FILES = new HashSet<>();

    static {
        IGNORE_FILES.add("index.ts");
        IGNORE_FILES.add("index.d.ts");
        IGNORE_FILES.add("_showcase");
        IGNORE_FILES.add("abstract");
        IGNORE_FILES.add("abstract-component");
        IGNORE_FILES.add("template-basis");
    }

    public static class NavigationItem {

        private String customElementTag;
        private String link;

        public NavigationItem(String pageClazzName, String link) {
            this.customElementTag = pageClazzName;
            this.link = link;
        }

        public String getCustomElementTag() {
            return customElementTag;
        }

        public void setCustomElementTag(String customElementTag) {
            this.customElementTag = customElementTag;
        }

        public String getLink() {
            return link;
        }

        public void setLink(String link) {
            this.link = link;
        }

    }

    public static void main(String[] args) throws IOException {
        create();
    }

    public static void create() throws IOException {

        VelocityEngine velocityEngine = getEngine();

        velocityEngine.init();
        Template t = velocityEngine
                .getTemplate("showcase-app.vm");

        VelocityContext context = new VelocityContext();

        File showCaseFolder = new File(ModuleGenerator.PROJECT_SOURCE_ROOT, "_showcase");
        List<NavigationItem> navigationItems = new ArrayList<>();
        List<String> imports = new ArrayList<>();

        for (File file : showCaseFolder.listFiles()) {

            if (!file.getName().endsWith(".ts") || IGNORE_FILES.contains(file.getName())) {
                continue;
            }

            String content = Files.readString(file.toPath());
            String customElementTag = "";
            for (String line : content.lines().collect(Collectors.toList())) {

                int startIndex = line.indexOf("@customElement('");
                if (startIndex > -1) {
                    customElementTag = line.substring(startIndex + 16, line.lastIndexOf("'"));
                }
            }

            String link = file.getName().replace("-", "").replace(".ts", "");
            NavigationItem navigationItem = new NavigationItem("<" + customElementTag + "></" + customElementTag + ">", link);
            navigationItems.add(navigationItem);
            imports.add(file.getName());
        }

        context.put("navigationItems", navigationItems);
        context.put("imports", imports);

        StringWriter writer = new StringWriter();

        t.merge(context, writer);

        File page = new File(showCaseFolder, "showcase-app.ts");
        if (page.exists()) {
            page.delete();
        }
        Files.writeString(page.toPath(), writer.toString(), StandardOpenOption.CREATE);

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
