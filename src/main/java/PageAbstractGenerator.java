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
import java.util.List;

public class PageAbstractGenerator {

    public static class Link {

        private String link;
        private String i18n;

        public Link(String link, String i18n) {
            this.link = link;
            this.i18n = i18n;
        }

        public String getLink() {
            return link;
        }

        public void setLink(String link) {
            this.link = link;
        }

        public String getI18n() {
            return i18n;
        }

        public void setI18n(String i18n) {
            this.i18n = i18n;
        }

    }

    public static void main(String[] args) throws IOException {
        create();
    }

    public static void create() throws IOException {

        VelocityEngine velocityEngine = getEngine();

        velocityEngine.init();
        Template t = velocityEngine
                .getTemplate("page-abstract.vm");

        VelocityContext context = new VelocityContext();


        File showCaseFolder = new File(ModuleGenerator.PROJECT_SOURCE_ROOT, "_showcase");
        List<Link> links = new ArrayList<>();
        List<String> i18n = new ArrayList<>();

        for (File file : showCaseFolder.listFiles()) {
            if(!file.getName().endsWith(".ts")){
                continue;
            }
            String link = file.getName().replace("-", "").replace(".ts", "");
            i18n.add(link);
            links.add(new Link("#" + link, "${this.i18nService.getValue(\"" + link + "\")}"));
        }

        context.put("links", links);

        StringWriter writer = new StringWriter();

        t.merge(context, writer);

        File page = new File(showCaseFolder, "page-abstract.ts");
        if (page.exists()) {
            page.delete();
        }
        Files.writeString(page.toPath(), writer.toString(), StandardOpenOption.CREATE);


        createI18n("de", i18n);
        createI18n("en", i18n);


    }

    private static void createI18n(String lang, List<String> i18ns) throws IOException {

        VelocityEngine velocityEngine = getEngine();

        velocityEngine.init();
        Template t = velocityEngine
                .getTemplate("i18n.vm");

        VelocityContext context = new VelocityContext();


        File showCaseFolder = new File(ModuleGenerator.PROJECT_SOURCE_ROOT, "_showcase");

        context.put("i18ns", i18ns);

        StringWriter writer = new StringWriter();

        t.merge(context, writer);

        File page = new File(showCaseFolder, "message-" + lang + ".json");
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
