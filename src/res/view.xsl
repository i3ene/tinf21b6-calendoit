<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="root">
    <div class="widget-list">
      <xsl:call-template name="show-events">
      </xsl:call-template>
    </div>
    <div class="widget-list">
      <xsl:call-template name="show-habits">
      </xsl:call-template>
    </div>
  </xsl:template>
  
  
  <!-- DateTime zu Date Formatieren (MM dd yyyy)-->
  <xsl:template name="format-iso-date">
    <xsl:param name="iso-date"/>
    <xsl:variable name="year" select="substring($iso-date, 1, 4)"/>
    <xsl:variable name="month" select="substring($iso-date, 6, 2)"/>
    <xsl:variable name="day" select="substring($iso-date, 9, 2)"/>
    <xsl:value-of select="concat($month, ' ',$day, ', ', $year)"/>
  </xsl:template>
  
  <!-- DateTime zu Zeit formatieren (HH:mm) -->
  <xsl:template name="format-time">
    <xsl:param name="iso-date"/>
    <xsl:variable name="hour" select="substring($iso-date, 12, 2)"/>
    <xsl:variable name="minute" select="substring($iso-date, 15, 2)"/>
    
    <xsl:value-of select="concat($hour,':',$minute)"/>
  </xsl:template>
  
  
  
  <xsl:template name="title">
    <div class="color-label">
      <xsl:attribute name="style">background-color:<xsl:value-of select="./color/primary"/></xsl:attribute>
    </div>
    <h2><xsl:value-of select="./title"/></h2>     
  </xsl:template>
  
  <xsl:template name="timestamp">
    <p class="event-time">
      von:
      <xsl:call-template name="format-time">
        <xsl:with-param name="iso-date" select="./start"/>
      </xsl:call-template>
      
      bis:
      <xsl:call-template name="format-time">
        <xsl:with-param name="iso-date" select="./end"/>
      </xsl:call-template>
    </p>  
  </xsl:template>
  
  <xsl:template name="actions">
    <xsl:param name="href"/>
    <div class="actions">
      <a class="mat-focus-indicator mat-stroked-button mat-button-base">
        <xsl:attribute name="href">#/<xsl:value-of select="$href"/></xsl:attribute>
        <span class="mat-button-wrapper">Anzeigen</span>
        <span class="mat-button-focus-overlay"></span>
      </a>
    </div>  
  </xsl:template>
  
  <xsl:template name="show-events">
    <h1>Anstehende Termine</h1>
    
    <!-- get todays date as numbers  -->
    <xsl:variable name="yearNow" select="substring(@datetime,1,4)"/>
    <xsl:variable name="monthNow" select="substring(@datetime,6,2)"/>
    <xsl:variable name="dayNow" select="substring(@datetime,9,2)"/>
    
    <!-- loop over events -->
    <xsl:for-each select="events/*">
      
      <!-- get events date as numbers -->
      <xsl:variable name="yearEvent" select="substring(./start,1,4)"/>
      <xsl:variable name="monthEvent" select="substring(./start,6,2)"/>
      <xsl:variable name="dayEvent" select="substring(./start,9,2)"/>
      
      <!-- Check if event is today -->
      <xsl:if test="$yearNow=$yearEvent and $monthNow=$monthEvent and $dayNow=$dayEvent " >
        <div class="app-card">
          <xsl:call-template name="title"/>
          
          <xsl:call-template name="timestamp"/>
          
          <p><xsl:value-of select="./description"/></p>
          
          <xsl:call-template name="actions">
            <xsl:with-param name="href" select="'calendar'"/>
          </xsl:call-template>
        </div>
        
      </xsl:if>
    </xsl:for-each>
  </xsl:template>
  
  
  <xsl:template name="show-habits">
    <h1>Aktive Gewohnheiten</h1>
    
    <!-- loop over habits -->
    <xsl:for-each select="habits/*">
      
      <div class="app-card">
        <xsl:call-template name="title"/>

        <xsl:call-template name="timestamp"/>

        <p><xsl:value-of select="./description"/></p>
        
        <div class="repeat-section">
          <xsl:if test="./repeat/repeating/@type='date'">
            <p>Diese Gewohnheit wiederholt sich bis 
              <xsl:call-template name="format-iso-date">
                <xsl:with-param name="iso-date" select="./repeat/repeating"/>
              </xsl:call-template> 
            </p>
          </xsl:if>
          
          <xsl:if test="./repeat/repeating/@type='number'">
            <p>Diese Gewohnheit wiederholt sich <xsl:value-of select="./repeat/repeating"/> mal</p>
          </xsl:if>
          
          <xsl:call-template name="show-day-list"/>
        </div>
        
        <xsl:call-template name="actions">
          <xsl:with-param name="href" select="'planner'"/>
        </xsl:call-template>
      </div>
    </xsl:for-each>
  </xsl:template>
  
  <xsl:template name="show-day-list">
    <div class="day-list app-border">
      <span >
        <xsl:if test="repeat/days/*=1">
          <xsl:attribute name="class">active-day</xsl:attribute>
        </xsl:if>
        Mo
      </span>
      
      <span>
        <xsl:if test="repeat/days/*=2">
          <xsl:attribute name="class">active-day</xsl:attribute>
        </xsl:if>
        Di
      </span>
      
      <span>
        <xsl:if test="repeat/days/*=3">
          <xsl:attribute name="class">active-day</xsl:attribute>
        </xsl:if>
        Mi
      </span>
      
      <span>
        <xsl:if test="repeat/days/*=4">
          <xsl:attribute name="class">active-day</xsl:attribute>
        </xsl:if>
        Do
      </span>
      
      <span>
        <xsl:if test="repeat/days/*=5">
          <xsl:attribute name="class">active-day</xsl:attribute>
        </xsl:if>
        Fr
      </span>
      
      <span>
        <xsl:if test="repeat/days/*=6">
          <xsl:attribute name="class">active-day</xsl:attribute>
        </xsl:if>
        Sa
      </span>
      
      <span>
        <xsl:if test="repeat/days/*=0">
          <xsl:attribute name="class">active-day</xsl:attribute>
        </xsl:if>
        So
      </span>
    </div>
  </xsl:template>
  
</xsl:stylesheet>
